import React from 'react';

import { GrSearch } from 'react-icons/gr';
import { GrTable } from 'react-icons/gr';
import { GrTableAdd } from 'react-icons/gr';
import { GrDocumentText } from 'react-icons/gr';
import { GrDocumentUser } from 'react-icons/gr';
import { GrFlagFill } from 'react-icons/gr';
import { GrAlert } from 'react-icons/gr';
import { GrBarChart } from 'react-icons/gr';
import { GrTroubleshoot } from 'react-icons/gr';
import { ImSigma } from 'react-icons/im';
import { FaExclamation } from 'react-icons/fa';
import { GrTree } from 'react-icons/gr';
import { GrAlarm } from 'react-icons/gr';

import { ReactComponent as SvgTable } from './svg/table.svg';
import { ReactComponent as SvgTwoTable } from './svg/tables-couple.svg';
import { ReactComponent as SvgSearch } from './svg/search.svg';
import { ReactComponent as SvgFile } from './svg/file.svg';
import { ReactComponent as SvgCalendar } from './svg/calendar.svg';
import { ReactComponent as SvgFlags } from './svg/flags.svg';
import { ReactComponent as SvgGraphBar } from './svg/graph-bar.svg';
import { ReactComponent as SvgSymbol } from './svg/symbol.svg';
import { ReactComponent as SvgTeam } from './svg/team.svg';
import { ReactComponent as SvgTools } from './svg/tools-and-utensils.svg';
import { ReactComponent as SvgDanger } from './svg/danger.svg';
import { ReactComponent as SvgExclamation } from './svg/exclamation-mark.svg';
import { ReactComponent as SvgDiagram } from './svg/diagram.svg';

const icons = [
  {
    id: 0,
    icon: <GrTable fontSize="large" />,
    svgImg: <SvgTable width="40px" height="40px" />,
  },
  {
    id: 1,
    icon: <GrSearch fontSize="large" />,
    svgImg: <SvgSearch width="40px" height="40px" />,
  },
  {
    id: 2,
    icon: <GrTableAdd fontSize="large" />,
    svgImg: <SvgTwoTable width="40px" height="40px" />,
  },
  {
    id: 3,
    icon: <GrBarChart fontSize="large" />,
    svgImg: <SvgGraphBar width="40px" height="40px" />,
  },
  {
    id: 4,
    icon: <GrDocumentText fontSize="large" />,
    svgImg: <SvgFile width="40px" height="40px" />,
  },
  {
    id: 7,
    icon: <GrDocumentText fontSize="large" />,
    svgImg: <SvgFile width="40px" height="40px" />,
  },
  {
    id: 11,
    icon: <ImSigma fontSize="large" />,
    svgImg: <SvgSymbol width="40px" height="40px" />,
  },
  {
    id: 16,
    icon: <GrTroubleshoot fontSize="large" />,
    svgImg: <SvgTools width="40px" height="40px" />,
  },
  {
    id: 19,
    icon: <GrTree fontSize="large" />,
    svgImg: <SvgDiagram width="40px" height="40px" />,
  },
  {
    id: 23,
    icon: <GrAlert fontSize="large" />,
    svgImg: <SvgDanger width="40px" height="40px" />,
  },
  {
    id: 25,
    icon: <FaExclamation fontSize="large" />,
    svgImg: <SvgExclamation width="40px" height="40px" />,
  },
  {
    id: 26,
    icon: <GrFlagFill fontSize="large" />,
    svgImg: <SvgFlags width="40px" height="40px" />,
  },
  {
    id: 28,
    icon: <GrAlarm fontSize="large" />,
    svgImg: <SvgCalendar width="40px" height="40px" />,
  },
  {
    id: 31,
    icon: <GrDocumentUser fontSize="large" />,
    svgImg: <SvgTeam width="40px" height="40px" />,
  },
];

export function getIcon(uid) {
  const finded = icons.find((i) => i.id === uid);
  return finded ? finded.icon : <p>{uid}</p>;
}

export function getSvgImg(uid) {
  const finded = icons.find((i) => i.id === uid);
  return finded ? finded.svgImg : <p>{uid}</p>;
}
