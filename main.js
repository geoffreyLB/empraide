const path = require('path')
const url = require('url')
const { app, BrowserWindow, Menu, shell } = require('electron')

const devMode = process.env.NODE_ENV === 'development'
const port = process.env.PORT
const isMac = process.platform === 'darwin'

const appName = app.getName()
const appUrl = devMode ? `http://localhost:${port}/` : url.format({
    pathname: path.resolve(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true
})

let index = 1
let currentWindow = null

const createWindow = () => {
    const options = {
        title: `Feuille n°${index++}`,
        width: 450,
        height: 376,
        useContentSize: true,
        resizable: false,
        maximizable: false,
        webPreferences: {
            devTools: devMode,
            nodeIntegration: false
        }
    }

    if (currentWindow) {
        const [x, y] = currentWindow.getPosition()

        options.x = x + 21
        options.y = y + 23
    }

    const window = currentWindow = new BrowserWindow(options)

    window.loadURL(appUrl)

    if (devMode)
        window.webContents.openDevTools()

    window.on('focus', () => {
        currentWindow = window
    })

    window.on('closed', () => {
        currentWindow = null
    })
}

const template = [
    {
        label: 'Fichier',
        submenu: [
            {
                label: 'Nouvelle feuille',
                click: createWindow,
                accelerator: 'CmdOrCtrl+N'
            },
            { type: 'separator' },
            { label: 'Fermer', role: 'close' },
        ]
    },
    {
        label: 'Modifier',
        role: 'editMenu',
        submenu: [
            { label: 'Annuler', role: 'undo' },
            { label: 'Rétablir', role: 'redo' },
            { type: 'separator' },
            { label: 'Couper', role: 'cut' },
            { label: 'Copier', role: 'copy' },
            { label: 'Coller', role: 'paste' },
            { label: 'Tout sélectionner', role: 'selectall' }
        ]
    },
    {
        label: 'Fenêtre',
        role: 'window',
        submenu: [
            {
                label: isMac ? 'Placer dans le Dock' : 'Réduire',
                role: 'minimize'
            }
        ]
    },
    {
        label: 'Aide',
        role: 'help',
        submenu: [
            {
                label: 'Signaler un problème',
                click: () => {
                    shell.openExternal('https://github.com/mattp94/empraide/issues')
                }
            }
        ]
    }
]

if (isMac)
    template.unshift({
        label: appName,
        submenu: [
            { label: `À propos d'${appName}`, role: 'about' },
            { type: 'separator' },
            { label: `Quitter ${appName}`, role: 'quit' }
        ]
    })

const menu = Menu.buildFromTemplate(template)

app.on('ready', () => {
    Menu.setApplicationMenu(menu)
    createWindow()
})

app.on('window-all-closed', () => {
    if (!isMac)
        app.quit()
})

app.on('activate', () => {
    if (currentWindow === null)
        createWindow()
})
