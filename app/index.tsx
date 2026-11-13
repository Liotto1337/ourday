import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Habit = {id:number; emoji:string; title:string; mine:boolean; theirs:boolean};
const initial: Habit[] = [
 {id:1,emoji:'💧',title:'Пить воду',mine:false,theirs:false},
 {id:2,emoji:'📚',title:'Читать 15 минут',mine:true,theirs:false},
 {id:3,emoji:'🚶',title:'Прогулка',mine:true,theirs:true},
];
export default function Home() {
 const [habits,setHabits]=useState(initial);
 const [draft,setDraft]=useState('');
 const [tab,setTab]=useState<'today'|'couple'>('today');
 const done=habits.filter(h=>h.mine&&h.theirs).length;
 const toggle=(id:number)=>setHabits(old=>old.map(h=>h.id===id?{...h,mine:!h.mine}:h));
 const add=()=>{if(!draft.trim())return;setHabits(old=>[...old,{id:Date.now(),emoji:'💗',title:draft.trim(),mine:false,theirs:false}]);setDraft('');};
 return <SafeAreaView style={s.root}><StatusBar style="dark"/><ScrollView contentContainerStyle={s.content}>
 <Text style={s.logo}>ourday ♡</Text><Text style={s.subtitle}>Маленькие шаги — вместе</Text>
 <View style={s.hero}><Text style={s.heroTitle}>Наш уютный день 💕</Text><Text style={s.heroText}>Сегодня вместе выполнено {done} из {habits.length}</Text><View style={s.track}><View style={[s.progress,{width:`${habits.length?done/habits.length*100:0}%`}]} /></View></View>
 <View style={s.tabs}><Pressable onPress={()=>setTab('today')} style={[s.tab,tab==='today'&&s.selected]}><Text style={s.tabText}>Сегодня</Text></Pressable><Pressable onPress={()=>setTab('couple')} style={[s.tab,tab==='couple'&&s.selected]}><Text style={s.tabText}>Наша пара</Text></Pressable></View>
 {tab==='today'?<><Text style={s.heading}>Наши привычки ✨</Text>{habits.map(h=><View key={h.id} style={s.card}><Text style={s.emoji}>{h.emoji}</Text><View style={{flex:1}}><Text style={s.name}>{h.title}</Text><Text style={s.muted}>Ты: {h.mine?'✓':'○'}   Партнёр: {h.theirs?'✓':'○'}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Отметить ${h.title}`} onPress={()=>toggle(h.id)} style={[s.check,h.mine&&s.checked]}><Text style={s.checkText}>{h.mine?'✓':'+'}</Text></Pressable></View>)}<View style={s.addRow}><TextInput value={draft} onChangeText={setDraft} placeholder="Новая привычка..." placeholderTextColor="#9B8E9D" style={s.input}/><Pressable onPress={add} style={s.addButton}><Text style={s.addText}>Добавить</Text></Pressable></View></>:<View style={s.card}><Text style={s.heading}>Вы вдвоём 💗</Text><Text style={s.muted}>Подключение партнёра появится на этапе 2.</Text><Text style={[s.muted,{marginTop:12}]}>Пока это локальная демоверсия: данные не синхронизируются и сбрасываются при перезапуске.</Text></View>}
 </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#FFF9FC'},content:{padding:22,paddingBottom:60},logo:{fontSize:34,fontWeight:'800',color:'#A96C9A',marginTop:22},subtitle:{color:'#947F91',marginBottom:26,fontSize:14},hero:{backgroundColor:'#F7DCEB',borderRadius:26,padding:24,marginBottom:22},heroTitle:{fontSize:23,fontWeight:'800',color:'#81577B'},heroText:{color:'#81577B',marginTop:10,marginBottom:18},track:{height:11,borderRadius:20,backgroundColor:'#FFF7FB',overflow:'hidden'},progress:{height:'100%',backgroundColor:'#CE90B8',borderRadius:20},tabs:{flexDirection:'row',backgroundColor:'#F3EAF3',borderRadius:18,padding:5,marginBottom:22},tab:{flex:1,alignItems:'center',padding:12,borderRadius:14},selected:{backgroundColor:'white'},tabText:{color:'#7B5977',fontWeight:'700'},heading:{fontSize:20,fontWeight:'800',color:'#73546D',marginBottom:13},card:{flexDirection:'row',alignItems:'center',backgroundColor:'white',borderRadius:20,padding:17,marginBottom:12},emoji:{fontSize:29,marginRight:12},name:{fontSize:16,fontWeight:'700',color:'#604B5D'},muted:{fontSize:12,color:'#9A8998',marginTop:5,lineHeight:18},check:{height:38,width:38,borderRadius:13,backgroundColor:'#F3E6F0',alignItems:'center',justifyContent:'center'},checked:{backgroundColor:'#D99FBE'},checkText:{color:'#785474',fontSize:22,fontWeight:'700'},addRow:{flexDirection:'row',gap:8,marginTop:10},input:{flex:1,backgroundColor:'white',borderRadius:14,padding:13,color:'#604B5D'},addButton:{backgroundColor:'#D99FBE',borderRadius:14,paddingHorizontal:14,justifyContent:'center'},addText:{color:'white',fontWeight:'700'}});