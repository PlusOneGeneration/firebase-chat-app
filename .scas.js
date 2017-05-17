module.exports = {
    title: '$ scas [actions] <arguments> <options>', // you can rewrite this for you goals
    description: 'Scaffolding console', // you can rewrite this for you goals
    // import other scas files or packages.
    imports: [
        // it needs to support default help
        // { path: 'scas/.scas' },

        // import other packages, here like:
        // npm install scas-angular --save-dev

        { path: 'node_modules/scas-angular' },
    ],
    // actions: {
    //     class: {
    //         title: 'Generate class - its your action', // free form title for help
    //         arguments: ['dir', 'name'], // required arguments
    //         input: 'template/class.js', // path to template
    //         out: '{{{ dir }}}/{{{ name | Camel }}}.class.js' // path to generated file
    //     },
    //     module: {
    //         'title': 'Generate module', // your help line
    //         arguments: ['dir', 'name'], // required arguments
    //         batch: [
    //             'class', // #1 re-used: class action with same arguments - simply, generates class file.
    //             {
    //                 name: 'class', // #2 re-used class action with mapped arguments, generates module class file.
    //                 map: {
    //                     dir: '{{{ dir }}}',
    //                     name: '{{{ name }}}Module'
    //                 }
    //             }
    //         ]
    //     }
    // },
    // pipes: {
    //     myCustomPipe: (context) => (input) => 'my-pipe-changes' + input
    // }
};
