import 'package:app/data/database.dart';
import 'package:app/services/chatgpt_service.dart';
import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';
import 'package:uuid/uuid.dart';

final chatgpt = ChatGPTService();
// 開發打開 trace 級別否則 info 級別
final logger = Logger(level: kDebugMode ? Level.trace : Level.info);
const uuid = Uuid();
late AppDatabase db;
