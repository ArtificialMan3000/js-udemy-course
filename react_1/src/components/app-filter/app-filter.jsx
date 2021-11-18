import './app-filter.css';

export const AppFilter = () => {
  return (
    <div className="btn-group">
      <button className="btn btn-light">Все сотрудники</button>
      <button className="btn btn-outline-light">На повышение</button>
      <button className="btn btn-outline-light">З/П больше 1000$</button>
    </div>
  );
};
