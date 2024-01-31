import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

// 開發打開 trace 級別否則 info 級別
final logger = Logger(level: kDebugMode ? Level.trace : Level.info);
