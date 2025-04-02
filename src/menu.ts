import { BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { enableOrDisableAdblocker } from "./adblocker";
import clearCache from "./cache";
import openDevTools from "./dev-tools";
import { enableOrDisableDiscordRPC, enableOrDisableDiscordRPCLocationTracking } from "./discord";
import { PLAY_URL, Store } from "./store";
import changeClubPenguinUrl from "./urlchanger";
import { toggleFullScreen } from "./window";

const createMenuTemplate = (store: Store, mainWindow: BrowserWindow): MenuItemConstructorOptions[] => {
  const jogar: MenuItemConstructorOptions = {
    id: '-1',
    label: "Jogar",
    click: () => mainWindow.loadURL(PLAY_URL)
  }
  const registrar: MenuItemConstructorOptions = {
    id: '0',
    label: "Criar Penguin",
    click: () => mainWindow.loadURL(`${PLAY_URL.replace("pt/", "")}/penguin/create`)
  }

  const adblock: MenuItemConstructorOptions = null; /*{
    id: '2',
    label: 'Adblock',
    submenu: [
      {
        label: 'Ativar/Desativar Adblock',
        click: () => { enableOrDisableAdblocker(store, mainWindow); }
      }
    ]
  };*/

  const discord: MenuItemConstructorOptions = {
    id: '1',
    label: 'Discord',
    submenu: [
      {
        label: 'Discord Rich Presence',
        click: () => { enableOrDisableDiscordRPC(store, mainWindow); }
      },
      {
        label: 'Rastreamente de sala no Discord',
        click: () => { enableOrDisableDiscordRPCLocationTracking(store, mainWindow); }
      }
    ]
  };

  const options: MenuItemConstructorOptions = {
    id: '2',
    label: 'Opções',
    submenu: [
      {
        label: 'Limpar Cache',
        click: () => { clearCache(mainWindow); }
      },
      {
        label: 'Abrir Dev Tools',
        accelerator: 'CommandOrControl+Shift+I',
        click: () => { openDevTools(mainWindow); }
      },
      /*{
        label: 'Mudar a URL do Club Penguin',
        click: () => { changeClubPenguinUrl(store, mainWindow); }
      },*/
      {
        label: 'Recarregar',
        accelerator: 'F5',
        role: 'reload',
      },
      /*{
        label: 'Recarregar Sem Cache',
        accelerator: 'CommandOrControl+R',
        click: () => { mainWindow.webContents.reloadIgnoringCache(); }
      },*/
      {
        label: 'Alternar Tela Cheia',
        accelerator: 'F11',
        click: () => { toggleFullScreen(store, mainWindow); }
      },
      { 
        label: 'Aumentar o Zoom',
        role: 'zoomIn',
        accelerator: 'CommandOrControl+=',
      },
      {
        label: 'Diminuir o Zoom',
        role: 'zoomOut',
        accelerator: 'CommandOrControl+-',
      },

      {
        label: 'Resetar o Zoom',
        role: 'resetZoom',
        accelerator: 'CommandOrControl+0',
      },
    ]
  };

  return [
    jogar,
    registrar,
    discord,
    options,
    //adblock,
  ];
};

const startMenu = (store: Store, mainWindow: BrowserWindow) => {
  const menuTemplate = createMenuTemplate(store, mainWindow);

  buildMenu(menuTemplate);
};

const buildMenu = (menuTemplate: MenuItemConstructorOptions[] | MenuItem[]) => {
  const menu = Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

export default startMenu;