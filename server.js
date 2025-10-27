const express = require('express');
const AdminJS = require('adminjs').default;
const { ComponentLoader } = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const SequelizeMeta = require('./models/SequelizeMeta');
const bcrypt = require('bcrypt');

const componentLoader = new ComponentLoader();

const Components = {
  TruncateJson: componentLoader.add('TruncateJson', path.join(__dirname, 'components/TruncateJson.jsx')),
  FullJsonView: componentLoader.add('FullJsonView', path.join(__dirname, 'components/FullJsonView.jsx')),
};

// DB connection
const sequelize = new Sequelize('oaks_local', 'readonly_user', 'readonly_password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

AdminJS.registerAdapter(AdminJSSequelize);

// Loading models dynamically
const modelsDir = path.join(__dirname, 'models');
const models = [];
fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js' && file !== 'SequelizeMeta.js' && file !== 'init-models.js') {
    const def = require(path.join(modelsDir, file));
    if (typeof def === 'function') {
      const model = def(sequelize, DataTypes);
      models.push(model);
    }
  }
});

const Users = models.find((m) =>
  ['Users', 'User'].includes(m.name) || String(m.tableName).toLowerCase() === 'users'
);

function detectJsonFields(model) {
  return Object.keys(model.rawAttributes || {}).filter((attr) => {
    const typeKey =
      (model.rawAttributes[attr].type &&
        (model.rawAttributes[attr].type.key ||
          (model.rawAttributes[attr].type.toString &&
            model.rawAttributes[attr].type.toString()))) ||
      '';
    const tk = String(typeKey).toUpperCase();
    return tk.includes('JSON') || tk.includes('JSONB');
  });
}

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const adminResources = models.map((model) => {
  const jsonFields = detectJsonFields(model);
  const properties = Object.keys(model.rawAttributes || {}).reduce((props, key) => {
    const attrType =
      model.rawAttributes[key].type?.key?.toUpperCase() ||
      String(model.rawAttributes[key].type).toUpperCase();

    props[key] = { isVisible: { list: true, filter: true, show: true, edit: true } };

    if (['JSON', 'JSONB', 'TEXT', 'ARRAY'].includes(attrType)) {
      props[key].type = 'textarea';
      props[key].isVisible = { list: true, filter: false, show: true, edit: true };
      props[key].components = {
        list: Components.TruncateJson,
        show: false,
      };
    }

    return props;
  }, {});

  const baseActions = {
    list: {
      isAccessible: true,
      after: async (response) => {
        if (response && Array.isArray(response.records)) {
          response.records.forEach((rec) => {
            jsonFields.forEach((f) => {
              const nestedKeys = Object.keys(rec.params).filter((key) =>
                key.startsWith(`${f}.`)
              );
              if (nestedKeys.length > 0) {
                const reconstructed = {};
                nestedKeys.forEach((key) => {
                  const subKey = key.split(`${f}.`)[1];
                  reconstructed[subKey] = rec.params[key];
                });
                let jsonString = JSON.stringify(reconstructed, null, 2);
                const maxLength = 50;
                if (jsonString.length > maxLength) {
                  jsonString = jsonString.substring(0, maxLength) + ' ...';
                }
                rec.params[f] = jsonString;
              } else {
                const v = rec.params[f];
                if (v !== undefined && v !== null) {
                  let textValue =
                    typeof v === 'object'
                      ? JSON.stringify(v, null, 2)
                      : String(v);
                  const maxLength = 50;
                  if (textValue.length > maxLength) {
                    textValue = textValue.substring(0, maxLength) + ' ...';
                  }
                  rec.params[f] = textValue;
                }
              }
            });
          });
        }
        return response;
      },
    },
    show: {
      isAccessible: true,
      after: async (response) => {
        const rec = response && response.record;
        if (rec) {
          jsonFields.forEach((f) => {
            const nestedKeys = Object.keys(rec.params).filter((key) => key.startsWith(`${f}.`));
            if (nestedKeys.length > 0) {
              const reconstructed = {};
              nestedKeys.forEach((key) => {
                const subKey = key.split(`${f}.`)[1];
                reconstructed[subKey] = rec.params[key];
              });
              rec.params[f] = JSON.stringify(reconstructed, null, 2);
            } else {
              const v = rec.params[f];
              if (v !== undefined && v !== null && typeof v === 'object') {
                rec.params[f] = JSON.stringify(v, null, 2);
              }
            }
          });
        }
        return response;
      },
    },
    new: { isAccessible: false },
    edit: { isAccessible: false },
    delete: { isAccessible: false },
  };

  const resourceConfig = {
    resource: model,
    options: {
      properties,
      listProperties: Object.keys(model.rawAttributes || {}),
      showProperties: Object.keys(model.rawAttributes || {}),
      editProperties: Object.keys(model.rawAttributes || {}),
      filterProperties: Object.keys(model.rawAttributes || {}),
      actions: baseActions,
    },
  };

  if (model.name.toLowerCase() === 'users' || model.tableName.toLowerCase() === 'users') {
    resourceConfig.options.properties.password = {
      isVisible: {
        list: false,
        filter: false,
        show: false,
        edit: true,
      },
    };

    resourceConfig.options.actions.new = {
      isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      before: async (request) => {
        if (request.payload?.password) {
          request.payload.password = hashPassword(request.payload.password);
        }
        return request;
      },
    };

    resourceConfig.options.actions.edit = {
      isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
      before: async (request) => {
        if (request.method === 'post') {
          if (request.payload?.password) {
            request.payload.password = hashPassword(request.payload.password);
          } else {
            delete request.payload?.password;
          }
        }
        return request;
      },
      after: async (response) => {
        if (response.record?.params) response.record.params.password = '';
        return response;
      },
    };

    resourceConfig.options.actions.delete = {
      isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
    };

    resourceConfig.options.actions.list.isAccessible = true;
    resourceConfig.options.actions.show.isAccessible = true;
  }

  return resourceConfig;
});

const adminJs = new AdminJS({
  rootPath: '/admin',
  componentLoader,
  resources: adminResources,
  branding: {
    companyName: 'Oaks Admin',
    logo: false,
    softwareBrothers: false,
  },
  pageSize: 20,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Oaks PostgreSQL');

    const app = express();

    const css = `
      [data-css*="TableHeaderCell"] { white-space: nowrap !important; text-align: center !important; vertical-align: middle !important; }
      [data-css*="TableHeaderCell"] span { display: inline-block !important; transform: none !important; writing-mode: horizontal-tb !important; white-space: normal !important; }
    `;
    fs.writeFileSync(path.join(__dirname, 'admin-temp.css'), css);
    app.use('/public', express.static(__dirname));
    adminJs.options.assets = { styles: ['/public/admin-temp.css'] };

    const authenticate = async (email, password) => {
      if (!Users) return null;
      const user = await Users.findOne({ where: { email } });
      if (!user) return null;

      
      const matched = await bcrypt.compare(String(password), String(user.password));
      if (matched) {
        return { email: user.email, role: user.role, id: user.id };
      }
      return null;
    };

    const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.ADMINJS_COOKIE_PASSWORD || 'change_this_in_prod_please',
    });

    app.use(adminJs.options.rootPath, router);

    app.listen(3000, () => {
      console.log('🚀 AdminJS running → http://localhost:3000/admin');
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
})();
