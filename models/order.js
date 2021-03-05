import moment from "moment";

class Order {
  // think about what an order would look like and what info
  // it would need. Max left out Guest name, Account Name,
  // shipping and address, etc.
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  // we need to add a method to our Model (Object) to get the date in the format we need.
  // dateObj.toLocaleDateString([locales[, options]])
  get readableDate() {
    // return this.date.toLocaleDateString("en-EN", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });
    return moment(this.date).format("MMMM Do YYYY, h:mm a");
  }
}

export default Order;
