import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    margin:'50px',
    padding: theme.spacing(3, 2)
  },
  flex:{
    display: 'flex',
    alignItems: 'center',
  },
  topicWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid gray',
  },
  chatWindow: {
    width: '70%',
    height: '300px',    
    padding: '20px',
    overflowY: 'scroll'
  },
 
  chatBox: {
    width: '85%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  botton: {
    width: '15%',
  }
}));