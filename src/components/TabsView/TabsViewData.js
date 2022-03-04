import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';

import { removeTab, changeTab } from '../../store/actions/tabAction';
import { useStyles, a11yProps } from './styles';
import TabPanel from './TabPanel';
import TabLabel from './TabLabel';

import Form from '../Forms';
import { RenderData, RenderError } from '../reports';
import DialogCloseTab from '../Dialog/DialogCloseTab';

const TabsViewData = () => {
  const classes = useStyles();
  //const layoutClasses = useLayoutStyles()

  const { items, pointer, count } = useSelector((store) => store.tabs);
  const dispatch = useDispatch();

  const [closeTab, setCloseTab] = useState(null);

  const handleChange = (event, newValue) => {
    if (newValue < items.length) {
      dispatch(changeTab(newValue));
    }
  };

  const handleRemove = (event, index) => {
    event.stopPropagation();

    const currentItem = items[index];

    if (currentItem.isEditable && currentItem?.isDocChanged) {
      setCloseTab(index.toString());
    } else {
      if (count === items.length - 1) {
        dispatch(changeTab(index - 1));
      }
      dispatch(removeTab(index));
    }
  };

  const handleDialogClose = (close) => {
    //const index = Number.parseInt(closeTab);
    if (close) {
      if (items[pointer].onSaveData) {
        items[pointer].onSaveData();
      }
    }

    if (count === items.length - 1) {
      dispatch(changeTab(pointer - 1));
    }
    dispatch(removeTab(pointer));

    setCloseTab(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.header} color="default">
        <Tabs
          value={pointer}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          {items.map((item, index) => {
            return (
              <Tab
                label={
                  <TabLabel
                    classes={classes}
                    onCloseTab={(event) => handleRemove(event, index)}
                  >
                    {item.loading ? (
                      <>
                        <CircularProgress size={20} /> Загрузка...
                      </>
                    ) : (
                      item.title
                    )}
                  </TabLabel>
                }
                {...a11yProps(index)}
                key={index}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {items.map((item, index) => {
        return (
          <TabPanel
            value={pointer}
            index={index}
            key={item.uid}
            classes={classes}
          >
            {item.form ? <Form id={item.uid} /> : null}
            {item.data ? <RenderData id={item.uid} /> : null}
            {item.error ? <RenderError id={item.uid} /> : null}
          </TabPanel>
        );
      })}
      <DialogCloseTab open={!!closeTab} handleClose={handleDialogClose} />
    </div>
  );
};

export default TabsViewData;
