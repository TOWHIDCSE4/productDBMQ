import Route from '@core/Routes'
const AuthAdminMiddleware = require('@app/Middlewares/AuthAdminMiddleware')

Route.get("/admin/login", "pages/admin/login").name("frontend.admin.login")
Route.get("/forgot-password", "pages/admin/forgotPassword").name("frontend.admin.forgotPassword")
Route.get("/reset-password/:token", "pages/admin/resetPassword").name("frontend.admin.resetPassword")

Route.group(() => {
  Route.get("/", "pages/admin/users").name("users.index").sidebar('users.index')
  {
    let name = 'documents'
    Route.get(`/${name}`, `pages/admin/${name}`).name(`${name}.index`).sidebar(`${name}.index`)
  }

  {
    let name = 'documents'
    Route.get(`/${name}`, `pages/admin/${name}`).name(`${name}.index`).sidebar(`${name}.index`)
  }

  {
    let name = 'application'
    Route.get(`/${name}`, `pages/admin/${name}`).name(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/staffInsurance`, `pages/admin/${name}/staffInsurance`).name(`${name}.staffInsurance`).parent(`${name}.index`).sidebar(`${name}.index`)
  }
  {
    let name = 'users'
    Route.get(`/${name}`, `pages/admin/${name}`).name(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/create`, `pages/admin/${name}/create`).name(`${name}.create`).parent(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/:id/edit`, `pages/admin/${name}/edit`).name(`${name}.edit`).parent(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/twofa`, `pages/admin/${name}/twoFa`).name(`${name}.twofa`).parent(`${name}.index`).sidebar(`${name}.twoindexfa`)
  }

  {
    let name = 'roles'
    Route.get(`/${name}`, `pages/admin/${name}`).name(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/create`, `pages/admin/${name}/create`).name(`${name}.create`).parent(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/:id/edit`, `pages/admin/${name}/edit`).name(`${name}.edit`).parent(`${name}.index`).sidebar(`${name}.index`)
    Route.get(`/${name}/:id/role`, `pages/admin/${name}/role`).name(`${name}.role`).parent(`${name}.index`).sidebar(`${name}.index`)
  }

}).name("frontend.admin").prefix("/admin").middleware([AuthAdminMiddleware])