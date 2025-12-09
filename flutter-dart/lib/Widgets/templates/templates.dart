import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Templates {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? name;
	 
	@HiveField(2)
	final String? subject;
	 
	@HiveField(3)
	final String? body;
	 
	@HiveField(4)
	final String? variables;
	 
	@HiveField(5)
	final String? image;
	 

  Templates({
    this.id,
		this.name,
		this.subject,
		this.body,
		this.variables,
		this.image
  });

  factory Templates.fromJson(Map<String, dynamic> map) {
    return Templates(
      id: map['_id'] as String?,
			map['name'] != null ? name : map['name'] as String : "",
			map['subject'] != null ? subject : map['subject'] as String : "",
			map['body'] != null ? body : map['body'] as String : "",
			map['variables'] != null ? variables : map['variables'] as String : "",
			map['image'] != null ? image : map['image'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id
    };
}

  @override
  String toString() => 'Templates('_id' : $id,"name": $name,"subject": $subject,"body": $body,"variables": $variables,"image": $image)';
}