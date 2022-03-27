//import Typography from '@material-ui/core/Typography'

//import Close from '@material-ui/icons/Close'
import CancelIcon from '@material-ui/icons/Cancel';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const StyledText = styled.div`
  padding-right: 3px;
`;

const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TabLabel = ({ classes, onCloseTab, children }) => {
  return (
    <StyledLabel>
      {/* <Typography>{title}</Typography> */}
      <StyledText>{children}</StyledText>
      <Icon>
        <CancelIcon onClick={onCloseTab} />
      </Icon>
    </StyledLabel>
  );
};
export default TabLabel;
