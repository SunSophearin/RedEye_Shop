export default defineAppConfig({
  ui: {
    // colors:{
    //   primary: 'black'
    // },
    container: {
        base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8'
    },
    navigationMenu: {
      slots: {
        label: 'w-full flex items-center gap-1.5 font-semibold text-xl text-highlighted px-2.5 py-1.5',

        link: 'group relative w-full flex items-center gap-1.5 font-medium text-xl before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',

        childLink: 'group relative  size-full flex items-start text-start text-xl before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2',

        childLabel: 'text-xl text-highlighted',

        childLinkLabel: 'truncate text-xl',
      }
    }}
})
