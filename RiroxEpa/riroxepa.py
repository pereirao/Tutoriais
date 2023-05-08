import discord, ffmpeg, asyncio
from discord.ext import commands
from discord.utils import get

# Define the user you want to listen for
BOT_TOKEN = 'MTAzMzE4NzM4NzcyOTI2NDcxMA.GVWuqS.jt6khxk5kV2BGZtbyRjUm3rNn-xQ9dufhMdS6g'

# Define the sound file to play
sound_file = 'uepa.mp3'

client = commands.Bot(command_prefix='!', intents=discord.Intents.default())

@client.event
async def on_ready():
    print('Bot is ready')

@client.event
async def on_voice_state_update(member, before, after):
    # Set the channel and user IDs you want to trigger on
    channel_id = 832681586126356491 # Replace with your channel ID
    user_id = 369905413463867392 # Replace with your user ID

    # Check if the member joined the specified channel
    if after.channel and after.channel.id == channel_id and member.id == user_id:
        # Join the voice channel and play the audio file
        voice_channel = await after.channel.connect()
        print("connected")

        audio_source = discord.FFmpegPCMAudio(executable="./ffmpeg/bin/ffmpeg.exe", source="./uepa.mp3")
        voice_channel.play(audio_source)
        print("playing")

        # Disconnect from the voice channel after the audio finishes playing
        while voice_channel.is_playing():
            await asyncio.sleep(1)
        await voice_channel.disconnect()
        print("disconnected")

# Run the client with your Discord bot token
client.run(BOT_TOKEN)
