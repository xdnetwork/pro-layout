import { Layout } from 'ant-design-vue'
import { ContainerQuery } from 'vue-container-query'
import GridContent from './components/GridContent'
import { SiderMenuWrapper, GlobalFooter } from './components'

import './BasicLayout.less'
import { SiderMenuProps } from './components/SiderMenu/SiderMenu'
import HeaderView, { HeaderViewProps } from './Header.jsx'

export const BasicLayoutProps = {
  ...SiderMenuProps,
  ...HeaderViewProps,
  locale: {
    type: String,
    default: 'en-US'
  },
  breadcrumbRender: {
    type: Function,
    default: () => undefined
  },
  disableMobile: {
    type: Boolean,
    default: false
  },
  mediaQuery: {
    type: Object,
    default: () => {}
  },
  handleMediaQuery: {
    type: Function,
    default: () => undefined
  }
}

// eslint-disable-next-line
const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

const headerRender = (h, props) => {
  if (props.headerRender === false) {
    return null
  }
  return <HeaderView { ...{ props } } />
}

const BasicLayout = {
  name: 'BasicLayout',
  functional: true,
  props: BasicLayoutProps,
  render (h, {
    props,
    data,
    children
  }) {
    const {
      menus,
      layout,
      logo,
      contentWidth,
      collapsed,
      // eslint-disable-next-line
      collapsedButtonRender, autoHideHeader,
      mediaQuery,
      handleMediaQuery,
      handleCollapse
    } = props

    return (
      <div>
        <ContainerQuery query={MediaQueryEnum} onChange={handleMediaQuery}>
          <Layout class={{ 'basicLayout': true, ...mediaQuery }}>
            {layout !== 'topmenu' && (
              <SiderMenuWrapper
                { ...{ props: props } }
                menus={menus}
                theme={'dark'}
                mode={'inline'}
                logo={logo}
                isMobile={false}
                collapsed={collapsed}
                onCollapse={handleCollapse}
                handleCollapse={handleCollapse}
                title='Ant Design Pro'
              />
            )}
            <Layout class={[layout]} style={{ paddingLeft: '0', minHeight: '100vh' }}>
              {/* <HeaderView
                menus={menus}
                contentWidth={contentWidth}
                layout={layout}
                theme={'dark'}
                mode={'horizontal'}
                logo={LogoSvg}
                collapsed={collapsed}
                handleCollapse={handleCollapse}
                collapsedButtonRender={collapsedButtonRender}
                autoHideHeader={autoHideHeader}
                headerRender={headerRender}
                title='Ant Design Pro' /> */}
              {headerRender(h, {
                ...props,
                theme: 'dark',
                mode: 'horizontal',
                title: 'Ant Design Pro'
              })}
              <Layout.Content style={{ margin: '24px 16px', padding: '24px', minHeight: '280px' }}>
                <GridContent contentWidth={contentWidth}>
                  {children}
                </GridContent>
              </Layout.Content>
              <Layout.Footer>
                <GlobalFooter>
                  <template slot="links">
                    <a href="https://www.github.com/vueComponent/" target="_self">Github</a>
                    <a href="https://www.github.com/sendya/" target="_self">@Sendya</a>
                  </template>
                  <template slot="copyright">
                    <a href="https://github.com/vueComponent">vueComponent</a>
                  </template>
                </GlobalFooter>
              </Layout.Footer>
            </Layout>
          </Layout>
        </ContainerQuery>
      </div>
    )
  }
}

export default BasicLayout