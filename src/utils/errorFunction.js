const errorFunction = (errorBit, msg, dataToSend) => {
     if (errorBit)
          return { is_error: errorBit, message: msg };
     else
          return { is_error: errorBit, message: msg, data: dataToSend };
}

module.exports = errorFunction;