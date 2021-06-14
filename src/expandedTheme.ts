import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    card: Palette['background'];
  }
  interface PaletteOptions {
    card: PaletteOptions['background'];
  }
}