import React, { useCallback, useState } from 'react';
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
import { useHistory } from 'react-router-dom';

const TabsViewData = () => {
  const classes = useStyles();
  //const layoutClasses = useLayoutStyles()

  const { items, pointer, count } = useSelector((store) => store.tabs);
  const dispatch = useDispatch();
  const history = useHistory();

  const [closeTab, setCloseTab] = useState(null);

  const handleChange = useCallback(
    (event, newValue) => {
      if (newValue < items.length) {
        dispatch(changeTab(newValue));
      }
    },
    [dispatch, items.length]
  );

  const handleRemove = useCallback(
    (event, index) => {
      event.stopPropagation();

      const currentItem = items[index];
      const from = currentItem.from;

      if (currentItem.isEditable && currentItem?.isDocChanged) {
        setCloseTab(index.toString());
      } else {
        dispatch(removeTab(index));
        if ((count === 0 || count === 1) && pointer === 0) {
          history.push(from);
        }
      }
    },
    [count, items, history, dispatch, pointer]
  );

  const handleDialogClose = (close) => {
    //const index = Number.parseInt(closeTab);
    if (close) {
      if (items[pointer].onSaveData) {
        items[pointer].onSaveData();
      }
    }
    const currentItem = items[pointer];
    const from = currentItem.from;

    if (count === items.length - 1) {
      dispatch(changeTab(pointer - 1));
    }
    dispatch(removeTab(pointer));
    if ((count === 0 || count === 1) && pointer === 0) {
      history.push(from);
    }
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
