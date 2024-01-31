import 'package:flutter/material.dart';

import '../models/message.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Message> messages = [
      Message(content: "Hello", isUser: true, timestamp: DateTime.now()),
      Message(
          content: "How are you?", isUser: false, timestamp: DateTime.now()),
      Message(
          content: "Fine,Thank you. And you?",
          isUser: true,
          timestamp: DateTime.now()),
      Message(content: "I am fine.", isUser: false, timestamp: DateTime.now()),
    ];

    final textController = TextEditingController();

    sendMessage(String content) {
      final message =
          Message(content: content, isUser: true, timestamp: DateTime.now());
      messages.add(message);
      textController.clear();
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Chat'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: ListView.separated(
                itemBuilder: (ctx, idx) => MessageItem(message: messages[idx]),
                separatorBuilder: (ctx, idx) => const Divider(height: 16),
                itemCount: messages.length,
              ),
            ),
            TextField(
              controller: textController,
              decoration: InputDecoration(
                hintText: 'Type a message',
                suffixIcon: IconButton(
                  onPressed: () {
                    if (textController.text.isNotEmpty) {
                      sendMessage(textController.text);
                    }
                  },
                  icon: const Icon(
                    Icons.send,
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class MessageItem extends StatelessWidget {
  const MessageItem({super.key, required this.message});

  final Message message;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          backgroundColor: message.isUser ? Colors.blue : Colors.grey,
          foregroundColor: Colors.white,
          child: Text(message.isUser ? 'You' : 'GPT'),
        ),
        const SizedBox(
          width: 8,
        ),
        Text(message.content),
      ],
    );
  }
}
