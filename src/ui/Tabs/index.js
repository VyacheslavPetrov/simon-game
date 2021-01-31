import React from 'react';
import {Link} from 'react-router-dom'

// item = [{name: "таблица", component: <TableContainer>}]

function Tabs({items = []}) {

  return (
    <div className="tabs__container">
      <div className="tabs__menu">
        {items.map((i, key) => <Link to={i.href} key={key}>{i.name}</Link>)}
      </div>
    </div>
  );
}

export default Tabs;
