export interface Order {
  price: number,
  size: number,
}
/**
 * The datafeed server returns an array of ServerRespond with 2 stocks.
 * We do not have to manipulate the ServerRespond for the purpose of this task.
 */
export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  // The url where datafeed server is listening
  static API_URL: string = 'http://localhost:8080/query?id=1';

  /**
   * Send request to the datafeed server and executes callback function on success
   * @param callback callback function that takes JSON object as its argument
   */
  static async getData(callback: (data: ServerRespond[]) => void): Promise<void> {
    try {
      const response = await fetch(DataStreamer.API_URL);

      if (response.ok) {
        const data: ServerRespond[] = await.response.json();
        callback(data);
      } else {
        console.error('Request failed with status:', response.status);
        alert('Request failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occured while fetching data');
    }
  }
}

export default DataStreamer;