import React, { CSSProperties } from 'react';
import { StatusType } from '../../model/StatusType';

 type Props = {
  status: StatusType;
  message: string;
  }

const statuseProps: Map<StatusType, CSSProperties> = new Map ([
  ["error", {backgroundColor: "red"}],
  ["warning", {backgroundColor: "yellow"}],
  ["success", {backgroundColor: "green"}],
])

const Alert: React.FC<Props> = ({status, message}) => {
  return <div>
    <p style={statuseProps.get(status)}>{message}</p>
  </div>
}

export default Alert;







