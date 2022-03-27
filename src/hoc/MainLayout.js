import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

import ListAltIcon from '@material-ui/icons/ListAlt';
import GridOnIcon from '@material-ui/icons/GridOn';
import { RiPlayListAddLine } from 'react-icons/ri';
import { FaSave } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { FaFileImport } from 'react-icons/fa';

import { useStyles } from './styleMainLayout';
import { appTitle } from '../common/constApp';
import TreeDrawer from '../components/Drawer/TreeDrawer';
import AboutDialog from '../components/Dialog/AboutDialog';
import { useListView } from '../ListViewContext';
import { logoutAuth } from '../store/actions/authAction';
import FooterBar from '../components/FooterBar/FooterBar';
import { updateTab } from '../store/actions/tabAction';

import DialogImportFile from '../components/Dialog/DialogImportFile';
import { Tooltip } from '@material-ui/core';

const DesktopLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fileRef = useRef();
  const [open, setOpen] = useState(true);
  const [isAbout, setIsAbout] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const listView = useListView();
  const dispatch = useDispatch();

  const { items, pointer } = useSelector((state) => state.tabs);

  const isTwoTables = items[pointer]?.data?.docClass === 'TfrmTwoTables';
  const isEditable = items[pointer]?.isEditable;
  const isNV = items[pointer]?.isNV;
  const isData = history.location.pathname === '/data';

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAuth());
    history.push('/login');
  };

  const handleAbout = () => {
    setIsAbout((prev) => !prev);
  };

  const handleToggleView = () => {
    listView.toggle();
  };

  const handleChangePosition = () => {
    if (isTwoTables) {
      dispatch(
        updateTab({ ...items[pointer], isVert: !items[pointer].isVert })
      );
    }
  };

  const handleQueryView = () => {
    if (history.location.pathname === '/data') {
      history.goBack();
    } else {
      history.push('/data');
    }
  };

  const handleAddRow = () => {
    if (items[pointer].onAddRow) {
      items[pointer].onAddRow();
    }
  };
  const handleRemoveRows = () => {
    if (items[pointer].onRemoveRows) {
      items[pointer].onRemoveRows();
    }
  };
  const handleSaveRows = () => {
    if (items[pointer].onSaveData) {
      items[pointer].onSaveData();
    }
  };

  const handleCloseImportFile = () => {
    setOpenFileDialog(false);
  };

  const handleImportFile = (e) => {
    const files = e.target.files;

    if (files?.length > 0) {
      setOpenFileDialog(true);
      setSelectedFile(files[0]);
    }

    fileRef.current.value = null;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AboutDialog open={isAbout} onClose={handleAbout} />
      <DialogImportFile
        open={openFileDialog}
        onClose={handleCloseImportFile}
        file={selectedFile}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <TreeDrawer classes={classes} />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {appTitle}
            </Typography>
            {isEditable && isData ? (
              <>
                {isNV ? (
                  <Tooltip
                    arrow={true}
                    title={<Typography>Импортировать из файла</Typography>}
                  >
                    <label htmlFor="file">
                      <IconButton
                        color="inherit"
                        aria-label="list view"
                        component={'span'}
                      >
                        <FaFileImport />
                      </IconButton>
                      <input
                        id={'file'}
                        type={'file'}
                        accept={'.csv,.xlsx,.xls'}
                        onChange={handleImportFile}
                        style={{ display: 'none' }}
                        ref={fileRef}
                      />
                    </label>
                  </Tooltip>
                ) : null}

                <Tooltip
                  arrow={true}
                  title={<Typography>Добавить строку</Typography>}
                >
                  <IconButton
                    color="inherit"
                    aria-label="list view"
                    onClick={handleAddRow}
                  >
                    <RiPlayListAddLine />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  arrow={true}
                  title={<Typography>Удалить выбранные строки</Typography>}
                >
                  <IconButton
                    color="inherit"
                    aria-label="list view"
                    onClick={handleRemoveRows}
                  >
                    <IoTrashOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  arrow={true}
                  title={<Typography>Сохранить изменения</Typography>}
                >
                  <span>
                    <IconButton
                      color="inherit"
                      aria-label="list view"
                      onClick={handleSaveRows}
                      disabled={!items[pointer].isDocChanged}
                    >
                      <FaSave />
                    </IconButton>
                  </span>
                </Tooltip>
              </>
            ) : null}
            {isTwoTables && isData ? (
              <Tooltip
                arrow={true}
                title={
                  <Typography>
                    Сменить позиционирование таблиц (вертикально/горизонтально)
                  </Typography>
                }
              >
                <IconButton
                  color="inherit"
                  aria-label="list view"
                  onClick={handleChangePosition}
                >
                  {items[pointer]?.isVert ? (
                    <ViewAgendaIcon style={{ transform: 'rotate(90deg)' }} />
                  ) : (
                    <ViewAgendaIcon />
                  )}
                </IconButton>
              </Tooltip>
            ) : null}
            {!isData ? (
              <Tooltip
                arrow={true}
                title={
                  <Typography>
                    Изменение внешнего вида меню (список/карточки)
                  </Typography>
                }
              >
                <IconButton
                  color="inherit"
                  aria-label="list view"
                  onClick={handleToggleView}
                >
                  {listView.list ? <GridOnIcon /> : <ListAltIcon />}
                </IconButton>
              </Tooltip>
            ) : null}
            <Button color="inherit" onClick={handleQueryView}>
              {isData ? 'Меню' : 'Запросы'}
            </Button>
            <Button color="inherit" onClick={handleAbout}>
              О нас
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Выход
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.mainBody}>{children}</div>
        <FooterBar />
      </main>
    </div>
  );
};
export default DesktopLayout;
