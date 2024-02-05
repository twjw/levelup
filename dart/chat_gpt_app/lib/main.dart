import 'dart:math';

import 'package:app/data/database.dart';
import 'package:app/services/injection.dart';
import 'package:app/widgets/chat_screen.dart';
import 'package:floor/floor.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  db = await $FloorAppDatabase
      .databaseBuilder('app_database3.db')
      .addMigrations([
        Migration(1, 2, (database) async {
          await database.execute(
              'CREATE TABLE IF NOT EXISTS `session` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` TEXT NOT NULL)');
          await database
              .execute('ALTER TABLE `message` ADD COLUMN session_id INTEGER');
          await database.execute(
              "insert into `session` (id, title) values (1, 'Default')");
          await database
              .execute("UPDATE `message` SET session_id = 1 WHERE 1=1");
        })
      ])
      .addCallback(Callback(onCreate: (database, version) {}))
      .build();

  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ChatGPT',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const ChatScreen(),
    );
  }
}
