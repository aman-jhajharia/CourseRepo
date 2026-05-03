import styles from './components.module.css';

export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Year</label>
        <select 
          name="year" 
          value={filters.year} 
          onChange={handleChange}
          className={styles.selectInput}
        >
          <option value="">All Years</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Semester</label>
        <select 
          name="semester" 
          value={filters.semester} 
          onChange={handleChange}
          className={styles.selectInput}
        >
          <option value="">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Type</label>
        <select 
          name="type" 
          value={filters.type} 
          onChange={handleChange}
          className={styles.selectInput}
        >
          <option value="">All Types</option>
          <option value="midterm">Midterm</option>
          <option value="endterm">Endterm</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Subject</label>
        <input 
          type="text" 
          name="subject"
          placeholder="Search subject..."
          value={filters.subject}
          onChange={handleChange}
          className="input-field"
        />
      </div>
    </aside>
  );
}
