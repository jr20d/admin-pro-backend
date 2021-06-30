const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', url: '/dashboard'},
            {titulo: 'ProgressBar', url: '/dashboard/progress'},
            {titulo: 'Gráficas', url: '/dashboard/grafica1'},
            {titulo: 'Promesas', url: '/dashboard/promesas'},
            {titulo: 'Obsevables', url: '/dashboard/observables'}
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuarios', url: '/mantenimiento/usuarios'},
            {titulo: 'Hospitales', url: '/mantenimiento/hospitales'},
            {titulo: 'Médicos', url: '/mantenimiento/medicos'}
          ]
        }
      ];
    if (role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo: 'Usuarios', url: '/mantenimiento/usuarios'});
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}