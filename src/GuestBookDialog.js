import React, { Component } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core'

import request from 'superagent'
import BBSForm from './BBSForm.js'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  h1: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 24,
    padding: 12
  },
  right: {
    textAlign: 'right'
  }
}

class GuestBookDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillMount () {
    this.loadLogs()
  }

  loadLogs () {
    request
      .get('/api/getItems')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({ items: data.body.logs })
      })
  }

  render () {
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}>{e.name} - {e.body}</li>
    ))

    return (
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"방명록"}</DialogTitle>
        <DialogContent>
          <BBSForm onPost={e => this.loadLogs()} />
          <p style={styles.right}>
            <button onClick={e => this.loadLogs()}>
              다시 불러오기
            </button>
          </p>
          <ul>{itemsHtml}</ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default GuestBookDialog
