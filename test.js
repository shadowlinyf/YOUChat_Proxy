const https = require("https");
const { v4: uuidv4 } = require("uuid");
const YOUCOM_COOKIE = `uuid_guest=39c1f43d-d5a4-4bdd-9f21-b8d927276950; uuid_guest_backup=39c1f43d-d5a4-4bdd-9f21-b8d927276950; safesearch_guest=Moderate; youchat_personalization=true; youchat_smart_learn=true; daily_query_date=Sun%20Apr%2007%202024; stytch_session=tTRza4R9MjGItgJoeUridc0BdPHTD7BildR2utz6sVKR; ydc_stytch_session=tTRza4R9MjGItgJoeUridc0BdPHTD7BildR2utz6sVKR; youpro_subscription=true; you_subscription=youpro_standard_undefined; safesearch_01679e0a004a18e4ddadbcf54c60762f1243e8b684902224ad0b33fb2707620c=Off; _cfuvid=hP.606O2oje6bNRrPk.Z9H4TKgCqR8jYohuKQFu.IsI-1712484847577-0.0.1.1-604800000; ai_model=claude_3_opus; __cf_bm=lUAKhKlYN88_U81s.BLf5H6929FRv.KzO84vfl53rd4-1712489777-1.0.1.1-bjgsUl.xlxlzRPdzrTpR9Vg_mE3VeCbhA.OJBuxDxc5kqltOCLMq7sHC4HRf_Vll6CNNWvc1SyO8.3vtmqSQ2L1vSAQgQhUwB1rIwlDD5tk; ab.storage.deviceId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3Af642f87c-4696-edbc-6294-31a40b1efc5e%7Ce%3Aundefined%7Cc%3A1712476426119%7Cl%3A1712489777735; ab.storage.userId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3Auser-live-5bc052b0-11bf-45e8-a97c-b766d0322813%7Ce%3Aundefined%7Cc%3A1712476503310%7Cl%3A1712489777736; stytch_session_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLTAyY2RhYzg0LTFiYjktNDIzOC1iYTczLTAyYzY5MjUxNGUwMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCJdLCJhdXRoMF9pZCI6bnVsbCwiZXhwIjoxNzEyNDkwMDc4LCJodHRwczovL3N0eXRjaC5jb20vc2Vzc2lvbiI6eyJpZCI6InNlc3Npb24tbGl2ZS05NGQ3YjhkNC01OGNmLTQxYmYtODc1ZC00NmM2NmRmNzI1ZjEiLCJzdGFydGVkX2F0IjoiMjAyNC0wNC0wN1QwNzo1NTowM1oiLCJsYXN0X2FjY2Vzc2VkX2F0IjoiMjAyNC0wNC0wN1QxMTozNjoxOFoiLCJleHBpcmVzX2F0IjoiMjAyNC0wNy0wNlQxMTozNjoxOFoiLCJhdHRyaWJ1dGVzIjp7InVzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIyLjAuMC4wIFNhZmFyaS81MzcuMzYgVml2YWxkaS82LjYuMzI3MS41NyIsImlwX2FkZHJlc3MiOiIxMDMuMTQyLjE0MC45In0sImF1dGhlbnRpY2F0aW9uX2ZhY3RvcnMiOlt7InR5cGUiOiJtYWdpY19saW5rIiwiZGVsaXZlcnlfbWV0aG9kIjoiZW1haWwiLCJsYXN0X2F1dGhlbnRpY2F0ZWRfYXQiOiIyMDI0LTA0LTA3VDA3OjU1OjAzWiIsImVtYWlsX2ZhY3RvciI6eyJlbWFpbF9pZCI6ImVtYWlsLWxpdmUtZjIxZjkwMDUtNDYzMi00OGYxLTliZTMtYWQzNzQzZjNmNzU1IiwiZW1haWxfYWRkcmVzcyI6InlvdWNvbS1hcmNoZWJAZ2Z3Lm1vZSJ9fV19LCJpYXQiOjE3MTI0ODk3NzgsImlzcyI6InN0eXRjaC5jb20vcHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCIsIm5iZiI6MTcxMjQ4OTc3OCwic3ViIjoidXNlci1saXZlLTViYzA1MmIwLTExYmYtNDVlOC1hOTdjLWI3NjZkMDMyMjgxMyIsInVzZXIiOnsiZW1haWwiOiJ5b3Vjb20tYXJjaGViQGdmdy5tb2UiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiIiLCJnaXZlbl9uYW1lIjoiIiwibmFtZSI6InlvdWNvbS1hcmNoZWJAZ2Z3Lm1vZSIsIm5pY2tuYW1lIjoieW91Y29tLWFyY2hlYiIsInN0eXRjaF91c2VyX2lkIjoidXNlci1saXZlLTViYzA1MmIwLTExYmYtNDVlOC1hOTdjLWI3NjZkMDMyMjgxMyIsInN1YiI6InVzZXItbGl2ZS01YmMwNTJiMC0xMWJmLTQ1ZTgtYTk3Yy1iNzY2ZDAzMjI4MTMifX0.hjn_Xlv-ziBxeyGDByvEYkZP349O5Vy2-3W-dJUypaRlt6cLdcNj4Mtp4mpEfoLCRUIQq2tPlqxxLvzHN_1v1HmPpvgg8M9wD8JiBUvZNk6t1GGZrxZnVY5IZ4zIfhv7PeCwozdffuWeUgM-VnDtm2xtWuUfGeqJorW29bAPgr8YLgQ9vmhTez1e_NcgBHN_ocQRDVSqPQ-c8YY6eWv-GZENp8cCs_Xbe89jb9DNsW_BMv4Xp7GqbBFahK_uLpKg-yGpQitNAAa3Zzd2wbc-JiphicB_eZWSC5vB_k4FuC_aU215fxs6L3fyV9x9t0giR5vdYwuk2PUCBJ2uLeOBJA; daily_query_count=8; ydc_stytch_session_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLTAyY2RhYzg0LTFiYjktNDIzOC1iYTczLTAyYzY5MjUxNGUwMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCJdLCJhdXRoMF9pZCI6bnVsbCwiZXhwIjoxNzEyNDkwMDc4LCJodHRwczovL3N0eXRjaC5jb20vc2Vzc2lvbiI6eyJpZCI6InNlc3Npb24tbGl2ZS05NGQ3YjhkNC01OGNmLTQxYmYtODc1ZC00NmM2NmRmNzI1ZjEiLCJzdGFydGVkX2F0IjoiMjAyNC0wNC0wN1QwNzo1NTowM1oiLCJsYXN0X2FjY2Vzc2VkX2F0IjoiMjAyNC0wNC0wN1QxMTozNjoxOFoiLCJleHBpcmVzX2F0IjoiMjAyNC0wNy0wNlQxMTozNjoxOFoiLCJhdHRyaWJ1dGVzIjp7InVzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIyLjAuMC4wIFNhZmFyaS81MzcuMzYgVml2YWxkaS82LjYuMzI3MS41NyIsImlwX2FkZHJlc3MiOiIxMDMuMTQyLjE0MC45In0sImF1dGhlbnRpY2F0aW9uX2ZhY3RvcnMiOlt7InR5cGUiOiJtYWdpY19saW5rIiwiZGVsaXZlcnlfbWV0aG9kIjoiZW1haWwiLCJsYXN0X2F1dGhlbnRpY2F0ZWRfYXQiOiIyMDI0LTA0LTA3VDA3OjU1OjAzWiIsImVtYWlsX2ZhY3RvciI6eyJlbWFpbF9pZCI6ImVtYWlsLWxpdmUtZjIxZjkwMDUtNDYzMi00OGYxLTliZTMtYWQzNzQzZjNmNzU1IiwiZW1haWxfYWRkcmVzcyI6InlvdWNvbS1hcmNoZWJAZ2Z3Lm1vZSJ9fV19LCJpYXQiOjE3MTI0ODk3NzgsImlzcyI6InN0eXRjaC5jb20vcHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCIsIm5iZiI6MTcxMjQ4OTc3OCwic3ViIjoidXNlci1saXZlLTViYzA1MmIwLTExYmYtNDVlOC1hOTdjLWI3NjZkMDMyMjgxMyIsInVzZXIiOnsiZW1haWwiOiJ5b3Vjb20tYXJjaGViQGdmdy5tb2UiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiIiLCJnaXZlbl9uYW1lIjoiIiwibmFtZSI6InlvdWNvbS1hcmNoZWJAZ2Z3Lm1vZSIsIm5pY2tuYW1lIjoieW91Y29tLWFyY2hlYiIsInN0eXRjaF91c2VyX2lkIjoidXNlci1saXZlLTViYzA1MmIwLTExYmYtNDVlOC1hOTdjLWI3NjZkMDMyMjgxMyIsInN1YiI6InVzZXItbGl2ZS01YmMwNTJiMC0xMWJmLTQ1ZTgtYTk3Yy1iNzY2ZDAzMjI4MTMifX0.hjn_Xlv-ziBxeyGDByvEYkZP349O5Vy2-3W-dJUypaRlt6cLdcNj4Mtp4mpEfoLCRUIQq2tPlqxxLvzHN_1v1HmPpvgg8M9wD8JiBUvZNk6t1GGZrxZnVY5IZ4zIfhv7PeCwozdffuWeUgM-VnDtm2xtWuUfGeqJorW29bAPgr8YLgQ9vmhTez1e_NcgBHN_ocQRDVSqPQ-c8YY6eWv-GZENp8cCs_Xbe89jb9DNsW_BMv4Xp7GqbBFahK_uLpKg-yGpQitNAAa3Zzd2wbc-JiphicB_eZWSC5vB_k4FuC_aU215fxs6L3fyV9x9t0giR5vdYwuk2PUCBJ2uLeOBJA; ab.storage.sessionId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3Ad52b99bb-2085-b575-2841-5fbbc0ecaf90%7Ce%3A1712491597045%7Cc%3A1712489777734%7Cl%3A1712489797045`;
let msgid = uuidv4();
let youcom_params = new URLSearchParams();
youcom_params.append("page", "1");
youcom_params.append("count", "10");
youcom_params.append("safeSearch", "Off");
youcom_params.append("q", "How to fry an egg?");
youcom_params.append("chatId", msgid);
youcom_params.append("traceId", msgid);
youcom_params.append("conversationTurnId", msgid);
youcom_params.append("selectedAIModel", "claude_3_opus");
youcom_params.append("selectedChatMode", "custom");
youcom_params.append("pastChatLength", "4");
youcom_params.append("queryTraceId", msgid);
youcom_params.append("use_personalization_extraction", "false");
youcom_params.append("domain", "youchat");
youcom_params.append("responseFilter", "");
youcom_params.append("mkt", "zh-CN");
youcom_params.append("chat", JSON.stringify([]));
console.log(youcom_params.toString())
var proxyReq = https.get({
	hostname: "you.com",
	port: 443,
	method: "GET",
	path: "/api/streamingSearch?" + youcom_params.toString(),
	headers:{
		"Cookie": YOUCOM_COOKIE,
		"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
		"Accept": "text/event-stream"
	}
}, (proxyRes) => {
	proxyRes.on("data", (chunk) => {
		// try to parse eventstream chunk
		console.log(chunk.toString());
	});
	proxyRes.on("end", () => {
		// send ending
		console.log("END");
	});
});