import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#F4F6FA',
    borderRadius: '8px 8px 0 0',
  },
  emojiPicker: {
    position: 'absolute',
    bottom: '120%',
    right: '0',
  },
  hideEmoji: {
    display: 'none',
  },
  displayNone: {
    display: 'none !important',
  },
}));

export default useStyles;
