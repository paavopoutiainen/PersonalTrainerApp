import React from 'react';

const CTrainingsView = ({link, addTraining}) => {
    return (
    <div>
            
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Trainings
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Customers trainings
            </Typography>
            <AddTraining link={link} addTraining={addTraining}></AddTraining>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </div>
            
        
    );
};

export default CTrainingsView;