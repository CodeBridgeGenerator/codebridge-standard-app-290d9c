import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class DepartmentHOD {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? Department;
	 
	@HiveField(2)
	final String? Head;
	 

  DepartmentHOD({
    this.id,
		this.Department,
		this.Head
  });

  factory DepartmentHOD.fromJson(Map<String, dynamic> map) {
    return DepartmentHOD(
      id: map['_id'] as String?,
			map['Department'] != null ? Department : map['Department'] as String : "",
			map['Head'] != null ? Head : map['Head'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id
    };
}

  @override
  String toString() => 'DepartmentHOD('_id' : $id,"Department": $Department,"Head": $Head)';
}