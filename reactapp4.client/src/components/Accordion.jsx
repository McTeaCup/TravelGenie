import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import style from '../style.module.css';
function Accordion({ items, containerClass, itemClass, contentClass }) {
  const [expandedItems, setExpandedItems] = useState(new Array(items.length).fill(false));

  const handleClick = (index) => {
    setExpandedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedItems[index];

    const icon = <span className={style.icon}>
      {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
    </span>;

    return (
      <div key={item.id}>
        <div
          className={itemClass || style.accordionItem}
          onClick={() => handleClick(index)}
        >
          {item.title}
          {icon}
        </div>
        {isExpanded && <div className={contentClass || style.accordionContent}>{item.content}</div>}
      </div>
    );
  });

  return (
    <div className={containerClass || style.accordionContainer}>
      {renderedItems}
    </div>
  );
}

export default Accordion;
