import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import Typography from '@material-ui/core/Typography'
//import Folder from '@material-ui/icons/Folder'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { ReactComponent as SvgFolder } from '../../icons/svg/folder.svg'

import { normId } from '../../utils/docs'

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label':
      {
        backgroundColor: 'transparent',
      },
  },
  content: {
    color: theme.palette.text.secondary,
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    paddingLeft: '10px',
  },
}))

function StyledTreeItem(props) {
  const classes = useTreeItemStyles()
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  )
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
}

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
})

export default function TreeDrawer(props) {
  const classes = useStyles()
  const history = useHistory()
  const state = useSelector((state) => state.tree)

  const handleNodeSelect = (event, nodeIds) => {
    history.push(`/view/${nodeIds}`)
  }

  const rSvgFolder = () => {
    return <SvgFolder width="24px" height="24px" />
  }

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let child = undefined
      if (treeItemData.child && treeItemData.child.length > 0) {
        child = getTreeItemsFromData(treeItemData.child)
      }
      return (
        <StyledTreeItem
          key={normId(treeItemData.DOC_ID)}
          nodeId={normId(treeItemData.DOC_ID)}
          labelText={treeItemData.DOC_NAME}
          labelIcon={rSvgFolder}
          children={child}
        ></StyledTreeItem>
      )
    })
  }

  return (
    <div className={props.classes.toolbar}>
      {state.loading ? (
        <h1>Loading...</h1>
      ) : (
        <TreeView
          className={classes.root}
          defaultExpanded={['3']}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          multiSelect={false}
          onNodeSelect={handleNodeSelect}
        >
          {getTreeItemsFromData(state.tree)}
        </TreeView>
      )}
    </div>
  )
}
