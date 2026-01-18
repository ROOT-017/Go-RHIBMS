import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from './i18n/index.ts';
import { store } from './store/index.ts';
import { ConfigProvider } from 'antd';
import { colors } from './assets/colors.ts';
import { AppInitializer } from './components/AppInitializer.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AppInitializer>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
              },
              components: {
                Input: {
                  fontSize: 16,
                  controlHeight: 40,
                  borderRadius: 10,
                  hoverBorderColor: colors.blueColorPrimary,
                  activeBorderColor: colors.blueColorPrimary,
                },
                Button: {
                  /* button */
                  colorPrimary: colors.blueColorPrimary,
                  colorPrimaryHover: colors.tealColor,
                  colorPrimaryActive: colors.tealColor,
                  colorPrimaryBg: 'red',
                  colorText: colors.blueColorPrimary,
                  fontSize: 16,
                  fontWeight: 500,
                  borderRadius: 10,
                  defaultActiveBg: colors.tealColor,
                  defaultActiveColor: colors.whiteColor,
                  defaultHoverBg: colors.tealColor,
                  defaultHoverBorderColor: 'none',
                  defaultHoverColor: colors.whiteColor,
                },
                Steps: {
                  finishIconBorderColor: colors.blueColorPrimary,
                  navArrowColor: '#fff',
                },
                Select: {
                  borderRadius: 10,
                  fontSize: 16,
                  controlHeight: 40,
                  colorText: colors.textColor,
                  colorIcon: colors.textColor,
                  colorPrimaryHover: colors.blueColorPrimary,
                  colorPrimaryActive: colors.blueColorPrimary,
                },
                Tabs: {
                  itemSelectedColor: colors.textColor,
                  inkBarColor: colors.blueColorPrimary,
                  itemHoverColor: colors.tealColor,
                  itemColor: colors.textColor,
                },
                Menu: {
                  itemSelectedBg: colors.lightBlueColor,
                  itemSelectedColor: colors.blueColorPrimary,
                  borderRadius: 0,
                },
                Table: {
                  colorText: colors.textColor,
                },
                Progress: {
                  remainingColor: colors.fadedTealColor,
                },
                Collapse: {
                  fontSize: 16,
                },
                Radio: {
                  buttonSolidCheckedActiveBg: colors.errorColor,
                  buttonSolidCheckedBg: colors.errorColor,
                  buttonSolidCheckedHoverBg: colors.errorColor,
                },
                DatePicker: {
                  borderRadius: 10,
                },
                Form: {
                  itemMarginBottom: 8,
                },
              },
            }}
          >
            <App />
          </ConfigProvider>
        </AppInitializer>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
