import Socket from '../../server';

export const create = async (req, res) =>{
  console.log("**000**");

  try {
    const { instanceId, messages, status } = req.body;

    if (messages && messages.length) Socket.onNewMessage(instanceId, messages[0]);
    else if (status) Socket.onStatusUpdate(instanceId, status);
    
    res.send('OK');
  }
  catch(err){
    res.send(err);
  }
}
/*
class SessionController {
  async create(request, response) {
    const { instanceId, messages, status } = request.body;

    if (messages && messages.length) Socket.onNewMessage(instanceId, messages[0]);
    else if (status) Socket.onStatusUpdate(instanceId, status);
    
    return response.send('OK');
  }
}
export default new SessionController();
*/
