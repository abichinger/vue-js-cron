declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AButton: (typeof import('ant-design-vue'))['Button']
    AMenu: (typeof import('ant-design-vue'))['Menu']
    ADropdown: (typeof import('ant-design-vue'))['Dropdown']
    AMenuItem: (typeof import('ant-design-vue'))['MenuItem']
  }
}

export {}
