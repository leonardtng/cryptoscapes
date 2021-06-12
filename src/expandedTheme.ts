import '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteColor extends ColorPartial { }
  interface Palette {
    card: Palette['background'];
    chartHues: Palette['primary'];
  }
  interface PaletteOptions {
    card: PaletteOptions['background'];
    chartHues: PaletteOptions['primary'];
  }
}