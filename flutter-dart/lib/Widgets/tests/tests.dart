import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Tests {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? stack;
	 
	@HiveField(2)
	final String? service;
	 
	@HiveField(3)
	final int? passed;
	 
	@HiveField(4)
	final int? failed;
	 
	@HiveField(5)
	final String? notes;
	 

  Tests({
    this.id,
		this.stack,
		this.service,
		this.passed,
		this.failed,
		this.notes
  });

  factory Tests.fromJson(Map<String, dynamic> map) {
    return Tests(
      id: map['_id'] as String?,
			map['stack'] != null ? stack : map['stack'] as String : "",
			map['service'] != null ? service : map['service'] as String : "",
			passed : map['passed'] as int,
			failed : map['failed'] as int,
			map['notes'] != null ? notes : map['notes'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'passed' : passed,
			'failed' : failed
    };
}

  @override
  String toString() => 'Tests('_id' : $id,"stack": $stack,"service": $service,"passed": $passed,"failed": $failed,"notes": $notes)';
}