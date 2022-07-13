const { CustomerList } = require("../UserList")

const resolvers = {
    Query: {
      users: (_, args) => {
        let result = CustomerList;
          const shouldApplyNameFilter = args.input && args.input.status;
  
        if (shouldApplyNameFilter) {
          const nameFilter = args.input.status;
  
          result = result.filter((r) => r.status.toLowerCase()
            .indexOf(nameFilter.toLowerCase()) !== -1);
        }
        return result;
      }
    }
  }
  module.exports = { resolvers };