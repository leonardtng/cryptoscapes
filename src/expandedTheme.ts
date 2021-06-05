import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    card: Palette['primary'];
  }
  interface PaletteOptions {
    card: PaletteOptions['primary'];
  }
}