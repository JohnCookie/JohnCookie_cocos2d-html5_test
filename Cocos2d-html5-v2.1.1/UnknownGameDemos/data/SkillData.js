/*
	���ܷ�Ϊ�ܶ���
	1 ���μ����Լ��� ʹ�ú�Ա�������һ��һ����Ч���������´ι����� �����´η������ȣ�
	2 �����Լ��ܣ������������ƣ� ��Ҫ������д���
	3 buff������ ʹ�ú�����ѷ�һ������X�ֵ�����Ч�������ӷ����� �������ȣ�
	4 debuff����� ʹ�ú�Եз�ʩ��һ������X�ֵļ���Ч���������ж��ȣ�
	���� 2��3��4����ʱ��Ϊ�������� ֮��ͨ��״ֵ̬���м�¼�����״̬
	1 ���μ����༼��Ӧ�ð���һ��״ֵ̬id �������ﴦ�ڵ�״̬
	2 �����Լ���Ӧ����һ��atk������ʾ��������������ǿ�ȵȣ�
	3 buff������Ӧ�ð���һ��buff id������������
	4 debuff�����Ӧ�ð���һ��debuff id�����������

	��ÿ��soldierӵ��һ��status���� ÿ�õ�һ��״̬ �����һ��״ֵ̬
*/
var SkillData={
	1:{
		"name":"Double Damage", // ��������
		"type":1, // ��������
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":0, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":0,
		"def_buff":0, // �����ṩ�ķ���buff id
		"def_buff_time":0,
		"def_debuff":0, //�����ṩ�ķ���debuff id
		"def_debuff_time":0
	},
	2:{
		"name":"Shield Wall",
		"type":1,
		"atk_buff":0, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 0, //�����Ļغ���
		"atk_debuff":0, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":0,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":1,
		"def_debuff":0, //�����ṩ�ķ���debuff id
		"def_debuff_time":0
	},
	3:{
		"name":"Split Arrow",
		"type":1,
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":1, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":1,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":1,
		"def_debuff":1, //�����ṩ�ķ���debuff id
		"def_debuff_time":1
	},
	4:{
		"name":"Piercing Arrow",
		"type":1,
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":1, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":1,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":1,
		"def_debuff":1, //�����ṩ�ķ���debuff id
		"def_debuff_time":1
	},
	5:{
		"name":"Ice Bolt",
		"type":1,
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":1, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":1,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":1,
		"def_debuff":1, //�����ṩ�ķ���debuff id
		"def_debuff_time":1
	},
	6:{
		"name":"Healing",
		"type":1,
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":1, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":1,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":1,
		"def_debuff":1, //�����ṩ�ķ���debuff id
		"def_debuff_time":1
	}
}