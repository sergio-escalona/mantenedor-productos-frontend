import { extendTheme, theme } from '@chakra-ui/react';

const swalOverrides = {
  '.swal2-container.swal2-center > .swal2-popup': {
    borderRadius: 24,
  },
  '.swal2-button': {
    fontSize: 14,
    margin: theme.space[1],
    boxShadow: theme.shadows.sm,
    textTransform: 'none',
    borderRadius: 5,
    padding: 3,
    fontWeight: 'bold',
    border: `1px solid ${theme.colors.gray}`,
    cursor: 'pointer',
  },
  '.swal2-button-confirm': {
    fontSize: 14,
    color: theme.colors.white,
    backgroundColor: '#006A5D',
    '&:hover': {
      backgroundColor: '#006A5D',
    },
  },
  '.swal2-button-cancel': {
    backgroundColor: '#D9E9E7',
    color: '#006A5D',
    '&:hover': {
      backgroundColor: '#D9E9E7',
      color: '#006A5D',
    },
  },
  '#swal2-title': {
    lineHeight: '110%',
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.gray[700],
  },
  '#swal2-html-container': {
    padding: 2,
    lineHeight: '110%',
    fontSize: 20,
    fontWeight: 'normal',
    color: theme.colors.gray[600],
  },
  '.ps-sidebar-root': {
    borderRightWidth: '0 !important',
    outline: 'none !important',
  },
};

const newTheme = extendTheme({
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    link: "'Inter', sans-serif",
  },
  colors: {
    brand: {
      100: '#9e6240',
      500: '#dea47e',
      700: '#cd4631',
    },
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        width: '100%',
        padding: 0,
        margin: 0,
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      '*:focus': {
        boxShadow: 'none !important',
      },

      '*[data-focus]': {
        boxShadow: 'none !important',
      },
      ...swalOverrides,
    },
  },
});

export default newTheme;
