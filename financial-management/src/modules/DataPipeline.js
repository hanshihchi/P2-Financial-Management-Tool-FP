export default function createDataPipeline() {
    /**
     * Ingests raw data.
     * @param {Array} source - Raw data (e.g., an array of transaction objects).
     * @returns {Array} - The ingested data.
     */
    function ingestData(source) {
      return source;
    }
  
    /**
     * Transforms data into a standard format.
     * @param {Array} data - Array of raw data items.
     * @returns {Array} - Array of transformed data items.
     */
    function transformData(data) {
      return data.map((item) => ({
        ...item,
        date: new Date(item.date).toISOString()
      }));
    }
  
    return { ingestData, transformData };
  }
  