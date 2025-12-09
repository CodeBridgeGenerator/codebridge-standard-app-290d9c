import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Profiles {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? name;
	 
	@HiveField(2)
	final String? userId;
	 
	@HiveField(3)
	final String? image;
	 
	@HiveField(4)
	final String? bio;
	 
	@HiveField(5)
	final String? department;
	 
	@HiveField(6)
	final bool? hod;
	 
	@HiveField(7)
	final String? section;
	 
	@HiveField(8)
	final bool? hos;
	 
	@HiveField(9)
	final String? position;
	 
	@HiveField(10)
	final String? manager;
	 
	@HiveField(11)
	final String? company;
	 
	@HiveField(12)
	final String? branch;
	 
	@HiveField(13)
	final String? skills;
	 
	@HiveField(14)
	final String? address;
	 
	@HiveField(15)
	final String? phone;
	 

  Profiles({
    this.id,
		this.name,
		this.userId,
		this.image,
		this.bio,
		this.department,
		this.hod,
		this.section,
		this.hos,
		this.position,
		this.manager,
		this.company,
		this.branch,
		this.skills,
		this.address,
		this.phone
  });

  factory Profiles.fromJson(Map<String, dynamic> map) {
    return Profiles(
      id: map['_id'] as String?,
			map['name'] != null ? name : map['name'] as String : "",
			map['userId'] != null ? userId : map['userId'] as String : "",
			map['image'] != null ? image : map['image'] as String : "",
			map['bio'] != null ? bio : map['bio'] as String : "",
			map['department'] != null ? department : map['department'] as String : "",
			hod : map['hod'] as bool,
			map['section'] != null ? section : map['section'] as String : "",
			hos : map['hos'] as bool,
			map['position'] != null ? position : map['position'] as String : "",
			map['manager'] != null ? manager : map['manager'] as String : "",
			map['company'] != null ? company : map['company'] as String : "",
			map['branch'] != null ? branch : map['branch'] as String : "",
			map['skills'] != null ? skills : map['skills'] as String : "",
			map['address'] != null ? address : map['address'] as String : "",
			map['phone'] != null ? phone : map['phone'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'hod' : hod,
			'hos' : hos
    };
}

  @override
  String toString() => 'Profiles('_id' : $id,"name": $name,"userId": $userId,"image": $image,"bio": $bio,"department": $department,"hod": $hod,"section": $section,"hos": $hos,"position": $position,"manager": $manager,"company": $company,"branch": $branch,"skills": $skills,"address": $address,"phone": $phone)';
}