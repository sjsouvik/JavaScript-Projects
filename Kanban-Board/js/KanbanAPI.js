export class KanbanAPI {
  static getColumnItems = (columnId) => {
    const kanbanData = read();

    return kanbanData.find((column) => column.id === columnId)?.items || [];
  };

  static addItem(columnId, itemTitle = "") {
    const kanbanData = read();

    const newItem = { id: Math.floor(Math.random() * 10000), title: itemTitle };

    const updatedKanbanData = kanbanData.map((column) =>
      column.id === columnId
        ? { ...column, items: [...column.items, newItem] }
        : column
    );

    save(updatedKanbanData);

    return newItem;
  }

  static updateItem(itemId, newProps) {
    const { title, columnId, position } = newProps;

    const kanbanData = read();

    let updatedKanbanData;

    if (columnId !== undefined && position !== undefined) {
      let item, currentColumn;

      // find the item and the current column using the given item id
      for (const column of kanbanData) {
        item = column.items.find((item) => item.id === itemId);

        if (item) {
          currentColumn = column;
          break;
        }
      }

      // remove the item from the current column
      updatedKanbanData = kanbanData.map((column) =>
        column.id === currentColumn.id
          ? {
              ...column,
              items: column.items.filter((item) => item.id !== itemId),
            }
          : column
      );

      // add the item to the given column id at the given position
      updatedKanbanData = updatedKanbanData.map((column) =>
        column.id === columnId
          ? {
              ...column,
              items: [
                ...column.items.slice(0, position),
                item,
                ...column.items.slice(position),
              ],
            }
          : column
      );
    }

    if (title) {
      updatedKanbanData = kanbanData.map((column) => ({
        ...column,
        items: column.items.map((item) =>
          item.id === itemId ? { ...item, title } : item
        ),
      }));
    }

    save(updatedKanbanData);
  }

  static deleteItem(itemId) {
    const kanbanData = read();

    const updatedKanbanData = kanbanData.map((column) => ({
      ...column,
      items: column.items.filter((item) => item.id !== itemId),
    }));

    save(updatedKanbanData);
  }
}

const read = () => {
  const kanbanData = localStorage.getItem("kanban-data");

  if (!kanbanData) {
    return [
      { id: 1, items: [] },
      { id: 2, items: [] },
      { id: 3, items: [] },
    ];
  }

  return JSON.parse(kanbanData);
};

const save = (kanbanData) => {
  localStorage.setItem("kanban-data", JSON.stringify(kanbanData));
};
