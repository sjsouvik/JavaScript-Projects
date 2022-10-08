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
    const { title } = newProps;

    const kanbanData = read();

    const updatedKanbanData = kanbanData.map((column) => ({
      ...column,
      items: column.items.map((item) =>
        item.id === itemId ? { ...item, title: title } : item
      ),
    }));

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
