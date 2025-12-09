import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Employees {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final String? empNo;
	 
	@HiveField(2)
	final String? name;
	 
	@HiveField(3)
	final String? fullname;
	 
	@HiveField(4)
	final String? company;
	 
	@HiveField(5)
	final String? department;
	 
	@HiveField(6)
	final String? section;
	 
	@HiveField(7)
	final String? position;
	 
	@HiveField(8)
	final String? supervisor;
	 
	@HiveField(9)
	final DateTime? dateJoined;
	 
	@HiveField(10)
	final DateTime? dateTerminated;
	 
	@HiveField(11)
	final String? resigned;
	 
	@HiveField(12)
	final String? empGroup;
	 
	@HiveField(13)
	final String? empCode;
	 

  Employees({
    this.id,
		this.empNo,
		this.name,
		this.fullname,
		this.company,
		this.department,
		this.section,
		this.position,
		this.supervisor,
		this.dateJoined,
		this.dateTerminated,
		this.resigned,
		this.empGroup,
		this.empCode
  });

  factory Employees.fromJson(Map<String, dynamic> map) {
    return Employees(
      id: map['_id'] as String?,
			map['empNo'] != null ? empNo : map['empNo'] as String : "",
			map['name'] != null ? name : map['name'] as String : "",
			map['fullname'] != null ? fullname : map['fullname'] as String : "",
			map['company'] != null ? company : map['company'] as String : "",
			map['department'] != null ? department : map['department'] as String : "",
			map['section'] != null ? section : map['section'] as String : "",
			map['position'] != null ? position : map['position'] as String : "",
			map['supervisor'] != null ? supervisor : map['supervisor'] as String : "",
			map['dateJoined'] != null ? DateTime.parse(map['dateJoined']) : null,
			map['dateTerminated'] != null ? DateTime.parse(map['dateTerminated']) : null,
			map['resigned'] != null ? resigned : map['resigned'] as String : "",
			map['empGroup'] != null ? empGroup : map['empGroup'] as String : "",
			map['empCode'] != null ? empCode : map['empCode'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'dateJoined' : dateJoined?.toIso8601String(),
			'dateTerminated' : dateTerminated?.toIso8601String()
    };
}

  @override
  String toString() => 'Employees('_id' : $id,"empNo": $empNo,"name": $name,"fullname": $fullname,"company": $company,"department": $department,"section": $section,"position": $position,"supervisor": $supervisor,"dateJoined": ${dateJoined?.toIso8601String()},"dateTerminated": ${dateTerminated?.toIso8601String()},"resigned": $resigned,"empGroup": $empGroup,"empCode": $empCode)';
}