/*
	����Ϊ���� ����ʾ��ʵʵ�ֽṹ
	���ܷ�Ϊ�ܶ���
	1 ���μ����Լ��� ʹ�ú�Ա�������һ��һ����Ч���������´ι����� �����´η������ȣ�
	2 �����Լ��ܣ������������ƣ� ��Ҫ������д���
	3 buff������ ʹ�ú�����ѷ�һ������X�ֵ�����Ч�������ӷ����� �������ȣ�
	4 debuff����� ʹ�ú�Եз�ʩ��һ������X�ֵļ���Ч���������ж��ȣ�
	���� 2��3��4����ʱ��Ϊ�������� ֮��ͨ��״ֵ̬���м�¼�����״̬
	1 ���μ����༼��Ӧ�ð���һ��״ֵ̬id �������ﴦ�ڵ�״̬
	2 �����Լ���Ӧ����һ��power������ʾ��������������ǿ�ȵȣ�
	3 buff������Ӧ�ð���һ��buff id������������
	4 debuff�����Ӧ�ð���һ��debuff id�����������

	��ÿ��soldierӵ��һ��status���� ÿ�õ�һ��״̬ �����һ��״ֵ̬
*/
/*
	��ʽ��
	type 1: ��������ĳ��buff/debuff�ļ��� ��˫����������ǽ�ȣ� ʹ�ú� ��Ҫ��������һ�ֻ����ж�
	type 2: �����Լ��� �̶��˺��Ĺ������� ����ӵ���
*/
var SkillData={
	1:{
		"name":"Double Damage", // �������� ���buff ʹ�»غϹ���������
		"type":1, // ��������
		"atk_buff":1, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 1, //�����Ļغ���
		"atk_debuff":0, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":0,
		"def_buff":0, // �����ṩ�ķ���buff id
		"def_buff_time":0,
		"def_debuff":0, //�����ṩ�ķ���debuff id
		"def_debuff_time":0,
		"img":"Sprites/spriteRes/skills/1.png",
		"cd":15
	},
	2:{
		"name":"Shield Wall", // ���buff ʹ���������1.5�� ����8���ж��غ�
		"type":1,
		"atk_buff":0, // �����ṩ�Ĺ���buff id
		"atk_buff_time": 0, //�����Ļغ���
		"atk_debuff":0, // �����ṩ�Ĺ���debuff id
		"atk_debuff_time":0,
		"def_buff":1, // �����ṩ�ķ���buff id
		"def_buff_time":8,
		"def_debuff":0, //�����ṩ�ķ���debuff id
		"def_debuff_time":0,
		"img":"Sprites/spriteRes/skills/2.png",
		"cd":20
	},
	3:{
		"name":"Split Arrow", // ���Ѽ� ���3������ļ�
		"type":2,
		"power": 45,
		"img":"Sprites/spriteRes/skills/3.png",
		"cd":20
	},
	4:{
		"name":"Piercing Arrow", // ��͸�� ������д�͸���ļ�
		"type":2,
		"power":38, 
		"img":"Sprites/spriteRes/skills/4.png",
		"cd":15
	},
	5:{
		"name":"Ice Bolt", // ������ ������� ��Ŀ������˺�����ʹ�ܵ��˺���Ŀ���ж�������һ�� ����5���ж��غ�
		"type":2,
		"power":40,
		"extra_debuff":1,
		"extra_debuff_time":5,
		"img":"Sprites/spriteRes/skills/5.png",
		"cd":15
	},
	6:{
		"name":"Healing", // ������ ���ѷ�Ŀ�����ƻظ�Ѫ��
		"type":2,
		"power":20, // �����ṩ�Ĺ���buff id
		"img":"Sprites/spriteRes/skills/6.png",
		"cd":10
	}
}