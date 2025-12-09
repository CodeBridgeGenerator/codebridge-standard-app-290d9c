import 'dart:convert';
import 'package:hive/hive.dart';

@HiveType(typeId: 2)

class Staffinfo {
  @HiveField(0)
	final String? id;
	 
	@HiveField(1)
	final int? empno;
	 
	@HiveField(2)
	final String? name;
	 
	@HiveField(3)
	final String? namenric;
	 
	@HiveField(4)
	final int? compcode;
	 
	@HiveField(5)
	final String? compname;
	 
	@HiveField(6)
	final String? deptcode;
	 
	@HiveField(7)
	final String? deptdesc;
	 
	@HiveField(8)
	final int? sectcode;
	 
	@HiveField(9)
	final String? sectdesc;
	 
	@HiveField(10)
	final String? designation;
	 
	@HiveField(11)
	final String? email;
	 
	@HiveField(12)
	final String? resign;
	 
	@HiveField(13)
	final String? supervisor;
	 
	@HiveField(14)
	final int? datejoin;
	 
	@HiveField(15)
	final String? empgroup;
	 
	@HiveField(16)
	final String? empgradecode;
	 
	@HiveField(17)
	final String? terminationdate;
	 

  Staffinfo({
    this.id,
		this.empno,
		this.name,
		this.namenric,
		this.compcode,
		this.compname,
		this.deptcode,
		this.deptdesc,
		this.sectcode,
		this.sectdesc,
		this.designation,
		this.email,
		this.resign,
		this.supervisor,
		this.datejoin,
		this.empgroup,
		this.empgradecode,
		this.terminationdate
  });

  factory Staffinfo.fromJson(Map<String, dynamic> map) {
    return Staffinfo(
      id: map['_id'] as String?,
			empno : map['empno'] as int,
			map['name'] != null ? name : map['name'] as String : "",
			map['namenric'] != null ? namenric : map['namenric'] as String : "",
			compcode : map['compcode'] as int,
			map['compname'] != null ? compname : map['compname'] as String : "",
			map['deptcode'] != null ? deptcode : map['deptcode'] as String : "",
			map['deptdesc'] != null ? deptdesc : map['deptdesc'] as String : "",
			sectcode : map['sectcode'] as int,
			map['sectdesc'] != null ? sectdesc : map['sectdesc'] as String : "",
			map['designation'] != null ? designation : map['designation'] as String : "",
			map['email'] != null ? email : map['email'] as String : "",
			map['resign'] != null ? resign : map['resign'] as String : "",
			map['supervisor'] != null ? supervisor : map['supervisor'] as String : "",
			datejoin : map['datejoin'] as int,
			map['empgroup'] != null ? empgroup : map['empgroup'] as String : "",
			map['empgradecode'] != null ? empgradecode : map['empgradecode'] as String : "",
			map['terminationdate'] != null ? terminationdate : map['terminationdate'] as String : ""
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id' : id,
			'empno' : empno,
			'compcode' : compcode,
			'sectcode' : sectcode,
			'datejoin' : datejoin
    };
}

  @override
  String toString() => 'Staffinfo('_id' : $id,"empno": $empno,"name": $name,"namenric": $namenric,"compcode": $compcode,"compname": $compname,"deptcode": $deptcode,"deptdesc": $deptdesc,"sectcode": $sectcode,"sectdesc": $sectdesc,"designation": $designation,"email": $email,"resign": $resign,"supervisor": $supervisor,"datejoin": $datejoin,"empgroup": $empgroup,"empgradecode": $empgradecode,"terminationdate": $terminationdate)';
}