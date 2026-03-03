import 'dart:convert';
import 'package:hive/hive.dart';
 
import '../Users/User.dart';
import '../Users/User.dart';
 
 
part 'FcmMessage.g.dart';
 
@HiveType(typeId: 30)

class FcmMessage {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	 
	final String? title;
	@HiveField(2)
	 
	final String body;
	@HiveField(3)
	 
	final List<User> recipients;
	@HiveField(4)
	 
	final String? image;
	@HiveField(5)
	 
	final User? from;

  FcmMessage({
    this.id,
		this.title,
		required this.body,
		required this.recipients,
		this.image,
		this.from
  });

  factory FcmMessage.fromJson(Map<String, dynamic> map) {
    return FcmMessage(
      id: map['_id'] as String?,
			title : map['title'] as String?,
			body : map['body'] as String,
			recipients : map['recipients'] != null ? (map['recipients'] as List).map((e) => User.fromJson(e)).toList() : [] ,
			image : map['image'] as String?,
			from : map['from'] != null ? User.fromJson(map['from']) : null
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			"recipients" : recipients.map((e) => e.toJson()).toList(),
			"from" : from?.id.toString()
    };
}

  @override
  String toString() => 'FcmMessage("_id" : $id,"title": $title.toString(),"body": $body.toString(),"recipients": $recipients.toString(),"image": $image.toString(),"from": $from.toString())';
}